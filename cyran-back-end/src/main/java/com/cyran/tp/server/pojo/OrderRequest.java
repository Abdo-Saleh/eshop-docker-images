package com.cyran.tp.server.pojo;


/**
 * Class for creating order request
 *
 * @author Peter Spusta
 */
public class OrderRequest {

    private Long id;
    private String userName;
    private String shipmentAddress;
    private Cart cartInfo;
    private CreditCard creditCardInfo;

    /**
     * Sets information of credit cart
     *
     * @param creditCardInfo - new credit card information
     */
    public void setCreditCardInfo(CreditCard creditCardInfo) {
        this.creditCardInfo = creditCardInfo;
    }

    /**
     * Returns payers credit cart information
     *
     * @return creditCardInfo
     */
    public CreditCard getCreditCardInfo() {
        return creditCardInfo;
    }

    /**
     * Sets payers Username
     *
     * @param userName - new user name
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * Returns username of User
     *
     * @return userName
     */
    public String getUserName() {
        return userName;
    }

    /**
     * Sets payers shipmentadress
     *
     * @param shipmentAddress - new shipmentaddress of payer
     */
    public void setShipmentAddress(String shipmentAddress) {
        this.shipmentAddress = shipmentAddress;
    }

    /**
     * Returns payer shipmentaddress
     *
     * @return shipmentAddress
     */
    public String getShipmentAddress() {
        return shipmentAddress;
    }

    /**
     * Sets information of Cart
     *
     * @param cartInfo - new cart information
     */
    public void setCartInfo(Cart cartInfo) {
        this.cartInfo = cartInfo;
    }

    /**
     * Returns Cart information
     *
     * @return cartInfo
     */
    public Cart getCartInfo() {
        return cartInfo;
    }

    /**
     * Sets order request ID
     *
     * @param id - new order id
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Returns Order Id
     *
     * @return id
     */
    public Long getId() {
        return id;
    }
}
