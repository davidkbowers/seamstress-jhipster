package com.bowerstechnologies.seamstress.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;

/**
 * A CustomerOrder.
 */
@Entity
@Table(name = "customer_order")
public class CustomerOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 500)
    @Column(name = "description", length = 500, nullable = false)
    private String description;

    @NotNull
    @Column(name = "placed_date", nullable = false)
    private Instant placedDate;

    @NotNull
    @Column(name = "promised_date", nullable = false)
    private Instant promisedDate;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "total_price", precision = 21, scale = 2, nullable = false)
    private BigDecimal totalPrice;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "total_paid", precision = 21, scale = 2, nullable = false)
    private BigDecimal totalPaid;

    @ManyToOne
    @JsonIgnoreProperties(value = "orders", allowSetters = true)
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public CustomerOrder description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getPlacedDate() {
        return placedDate;
    }

    public CustomerOrder placedDate(Instant placedDate) {
        this.placedDate = placedDate;
        return this;
    }

    public void setPlacedDate(Instant placedDate) {
        this.placedDate = placedDate;
    }

    public Instant getPromisedDate() {
        return promisedDate;
    }

    public CustomerOrder promisedDate(Instant promisedDate) {
        this.promisedDate = promisedDate;
        return this;
    }

    public void setPromisedDate(Instant promisedDate) {
        this.promisedDate = promisedDate;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public CustomerOrder totalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public BigDecimal getTotalPaid() {
        return totalPaid;
    }

    public CustomerOrder totalPaid(BigDecimal totalPaid) {
        this.totalPaid = totalPaid;
        return this;
    }

    public void setTotalPaid(BigDecimal totalPaid) {
        this.totalPaid = totalPaid;
    }

    public Customer getCustomer() {
        return customer;
    }

    public CustomerOrder customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CustomerOrder)) {
            return false;
        }
        return id != null && id.equals(((CustomerOrder) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CustomerOrder{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", placedDate='" + getPlacedDate() + "'" +
            ", promisedDate='" + getPromisedDate() + "'" +
            ", totalPrice=" + getTotalPrice() +
            ", totalPaid=" + getTotalPaid() +
            "}";
    }
}
