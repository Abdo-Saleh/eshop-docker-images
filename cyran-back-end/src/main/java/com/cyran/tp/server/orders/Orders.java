package com.cyran.tp.server.orders;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Columns;
import javax.persistence.CascadeType;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import com.cyran.tp.server.users.Users;

/**
 * Class for mapping orders to DB table using Hibernate
 *
 * @author Jakub Perdek
 */
@Entity
@Table(name = "orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id", unique = true, nullable = false)
    private Integer id;

    @Column(name = "address", nullable = false)
    private String shipmentAddress;

	@ManyToOne(targetEntity = Users.class)
	@JoinColumn(name="id")
    private Users user;
	
    @ManyToOne(targetEntity = CreditCard.class)
	@JoinColumn(name="card_id")
    private CreditCard creditCard;

    /**
     * Gets id of order
     *
     * @return id of order
     */
    public Integer getId() {
        return id;
    }

    /**
     * Sets id of order
     *
     * @param id of order
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Gets shipment address of order
     *
     * @return shipment address of order
     */
    public String getShipmentAddress() {
        return shipmentAddress;
    }

    /**
     * Sets shipment address of order
     *
     * @param shipmentAddress of order
     */
    public void setShipmentAddress(String shipmentAddress) {
        this.shipmentAddress = shipmentAddress;
    }

    /**
     * Gets creator of order
     *
     * @return user creator of order
     */
    public Users getUser() {
        return user;
    }

    /**
     * Sets creator of order
     *
     * @param user creator of order
     */
    public void setUser(Users user) {
        this.user = user;
    }

    /**
     * Gets credit card used to pay order
     *
     * @return credit card used to pay order
     */
    public CreditCard getCreditCard() {
        return creditCard;
    }

    /**
     * Sets credit card used to pay order
     *
     * @param credit card which was used to pay order
     */
    public void setCreditCard(CreditCard creditCard) {
        this.creditCard = creditCard;
    }


}
