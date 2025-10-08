import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import PaymentPopup from '../PaymentPopup'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = !Array.isArray(cartList) || cartList.length === 0

      const totalAmount = Array.isArray(cartList)
        ? cartList.reduce(
            (sum, eachItem) => sum + eachItem.price * eachItem.quantity,
            0,
          )
        : 0

      const cartItemsCount = Array.isArray(cartList) ? cartList.length : 0

      // TODO: Update the functionality to remove all the items in the cart

      const onRemoveAll = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <div className="removeAll">
                  <button
                    className="removeAllBtn"
                    type="button"
                    onClick={onRemoveAll}
                  >
                    Remove All
                  </button>
                </div>
                <CartListView />
                <div className="CartSummary">
                  <div>
                    <h1 className="CartSummaryHead">
                      Order Total:
                      <span className="amountRs"> Rs {totalAmount}/-</span>
                    </h1>
                    <p className="cartPara">{cartItemsCount} Items in cart</p>
                    <div className="desktopBtn">
                      <Popup
                        trigger={
                          <button type="button" className="checkoutBtn">
                            Checkout
                          </button>
                        }
                        modal
                        nested
                      >
                        {close => (
                          <PaymentPopup
                            close={close}
                            cartItemsCount={cartItemsCount}
                            totalAmount={totalAmount}
                          />
                        )}
                      </Popup>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
