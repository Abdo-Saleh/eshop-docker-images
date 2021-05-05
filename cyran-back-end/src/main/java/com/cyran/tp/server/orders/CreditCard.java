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
 * Class for mapping user to DB table using Hibernate
 *
 * @author Jakub Perdek, Peter Spusta
 */
@Entity
@Table(name = "cards")
public class CreditCard {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id", unique = true, nullable = false)
    private Integer id;

    @Column(name = "iban", unique = true, nullable = false)
    private String iban;

    @Column(name = "valid", nullable = false)
    private String valid;

    @Column(name = "cvc", nullable = false)
    private String cvc;

    @ManyToOne(targetEntity = Users.class)
	@JoinColumn(name="id")
    private Users user;

    /**
     * Gets id of mapped user
     *
     * @return id of mapped user
     */
    public Integer getId() {
        return id;
    }

    /**
     * Sets id of mapped user
     *
     * @param id of mapped user
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Gets IBAN of creadit card
     *
     * @return IBAN of creadit card
     */
    public String getIBAN() {
        return iban;
    }

    /**
     * Sets IBAN of creadit card
     *
     * @param IBAN of creadit card
     */
    public void setIBAN(String iban) {
        this.iban = iban;
    }

    /**
     * Gets validation code of credit card
     *
     * @return validation code of credit card
     */
    public String getValid() {
        return valid;
    }

    /**
     * Sets validation code of credit card
     *
     * @param validation code of credit card
     */
    public void setValid(String valid) {
        this.valid = valid;
    }

    /**
     * Gets cvc code of credit card
     *
     * @return cvc code of credit card
     */
    public String getCVC() {
        return cvc;
    }

    /**
     * Sets validation code of credit card
     *
     * @param validation code of credit card
     */
    public void setCVC(String cvc) {
        this.cvc = cvc;
    }

    /**
     * Gets role for mapped user - role in eshop (priviledge)
     *
     * @return user owner of credit card
     */
	public Users getUser() {
        return this.user;
    }

    /**
     * Sets user for credit card
     *
     * @param user owner of credit card
     */
    public void setUser(Users user) {
        this.user = user;
    }

}
