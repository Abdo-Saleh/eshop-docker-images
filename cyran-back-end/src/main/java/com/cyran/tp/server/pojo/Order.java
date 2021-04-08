package com.cyran.tp.server.pojo;


/**
 * Class for creating Order entity
 *
 * @author Peter Spusta
 */
public class Order {

    private Long id;
    private String userName;
    private String shipmentAddress;
    private Cart cartInfo;
    private CreditCard creditCard;
    
    /**
     * Sets iban of payers account
     *
     * @param IBAN - new IBAN
     */
    public void setCreditCard(CreditCard creditCard) {
        this.creditCard = creditCard;
    }
    
    /**
     * Returns payers creditCart
     *
     * @return creditCard
     */
    public CreditCard getCreditCard() {
        return creditCard;
    }
    /**
     * Sets user name of User
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
     * Sets order ID
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
