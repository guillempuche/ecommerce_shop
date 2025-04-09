'use client'

import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

import type {
	ProductColorOption,
	ProductStorageOption,
} from '@demo-shop/domain'

interface CartItem {
	id: string
	productId: string
	brand: string
	name: string
	price: number
	imageUrl: string
	color?: ProductColorOption
	storage?: ProductStorageOption
	quantity: number
}

interface CartContextType {
	items: CartItem[]
	totalItems: number
	totalPrice: number
	addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void
	removeItem: (id: string) => void
	updateQuantity: (id: string, quantity: number) => void
	clearCart: () => void
}

const defaultCartContext: CartContextType = {
	items: [],
	totalItems: 0,
	totalPrice: 0,
	addItem: () => {},
	removeItem: () => {},
	updateQuantity: () => {},
	clearCart: () => {},
}

const CartContext = createContext<CartContextType>(defaultCartContext)

export const useCart = () => useContext(CartContext)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [items, setItems] = useState<CartItem[]>([])
	const [totalItems, setTotalItems] = useState(0)
	const [totalPrice, setTotalPrice] = useState(0)
	const [isInitialized, setIsInitialized] = useState(false)

	// Load cart from localStorage on initial render
	useEffect(() => {
		// Only run this effect on the client side
		if (typeof window === 'undefined') return

		try {
			const savedCart = localStorage.getItem('cart')
			if (savedCart) {
				const parsedCart = JSON.parse(savedCart)
				// Validate that parsedCart is an array before setting it
				if (Array.isArray(parsedCart)) {
					setItems(parsedCart)
					updateTotals(parsedCart)
				}
			}
		} catch (error) {
			console.error('Failed to parse cart from localStorage:', error)
			// In case of error, clear localStorage to prevent future issues
			localStorage.removeItem('cart')
		}

		setIsInitialized(true)
	}, [])

	// Save cart to localStorage whenever it changes, but only after initial load
	useEffect(() => {
		if (typeof window === 'undefined' || !isInitialized) return

		try {
			localStorage.setItem('cart', JSON.stringify(items))
			updateTotals(items)
		} catch (error) {
			console.error('Failed to save cart to localStorage:', error)
		}
	}, [items, isInitialized])

	// Helper function to update totals
	const updateTotals = (cartItems: CartItem[]) => {
		const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
		const price = cartItems.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0,
		)

		setTotalItems(itemCount)
		setTotalPrice(price)
	}

	const addItem = (newItem: Omit<CartItem, 'id' | 'quantity'>) => {
		setItems(prevItems => {
			// Check if the same product with the same options already exists
			const existingItemIndex = prevItems.findIndex(
				item =>
					item.productId === newItem.productId &&
					item.color?.name === newItem.color?.name &&
					item.storage?.capacity === newItem.storage?.capacity,
			)

			if (existingItemIndex >= 0) {
				// Increment quantity if item already exists
				const updatedItems = [...prevItems]
				const existingItem = updatedItems[existingItemIndex]

				// Make sure the item exists before incrementing its quantity
				if (existingItem) {
					existingItem.quantity += 1
				}
				return updatedItems
			}

			// Create a unique ID that includes product info for better tracking
			const uniqueId = `${newItem.productId}-${newItem.color?.name || 'default'}-${newItem.storage?.capacity || 'default'}-${Date.now()}`

			// Add new item with unique ID
			return [
				...prevItems,
				{
					...newItem,
					id: uniqueId,
					quantity: 1,
				},
			]
		})
	}

	const removeItem = (id: string) => {
		setItems(prevItems => prevItems.filter(item => item.id !== id))
	}

	const updateQuantity = (id: string, quantity: number) => {
		if (quantity <= 0) {
			removeItem(id)
			return
		}

		setItems(prevItems =>
			prevItems.map(item => (item.id === id ? { ...item, quantity } : item)),
		)
	}

	const clearCart = () => {
		setItems([])
	}

	return (
		<CartContext.Provider
			value={{
				items,
				totalItems,
				totalPrice,
				addItem,
				removeItem,
				updateQuantity,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
