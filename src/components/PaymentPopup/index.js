import {useState, useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const paymentOptions = [
  'Card',
  'Net Banking',
  'UPI',
  'Wallet',
  'Cash on Delivery',
]

const PaymentPopup = ({close, cartItemsCount, totalAmount}) => {
  const [selectedPayment, setSelectedPayment] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const {removeAllCartItems} = useContext(CartContext)

  const handleConfirm = () => {
    if (selectedPayment === 'Cash on Delivery') {
      // Show success message
      setOrderPlaced(true)

      // Wait 2 seconds before closing popup
      setTimeout(() => {
        close()
        removeAllCartItems()
      }, 2000)
    }
    // Clear the cart
  }

  return (
    <div className="popup-container">
      {!orderPlaced ? (
        <>
          <h2 className="popup-title">Payment</h2>

          <div className="payment-options">
            {paymentOptions.map(option => (
              <label
                key={option}
                className={`payment-option ${
                  option === 'Cash on Delivery' ? 'enabled' : 'disabled'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={option}
                  disabled={option !== 'Cash on Delivery'}
                  checked={selectedPayment === option}
                  onChange={e => setSelectedPayment(e.target.value)}
                />
                {option}
              </label>
            ))}
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <p>{cartItemsCount} items</p>
            <p>Total Price: ₹{totalAmount}/-</p>
          </div>

          <button
            type="button"
            className="confirmBtn"
            disabled={selectedPayment !== 'Cash on Delivery'}
            onClick={handleConfirm}
          >
            Confirm Order
          </button>
        </>
      ) : (
        <h2 className="success-message">
          Your order has been placed successfully 🎉
        </h2>
      )}
    </div>
  )
}

export default PaymentPopup
