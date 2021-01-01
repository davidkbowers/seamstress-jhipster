package com.bowerstechnologies.seamstress.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Bear.
 */
@Entity
@Table(name = "bear")
public class Bear implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "image_file", nullable = false, unique = true)
    private String imageFile;

    @Column(name = "description")
    private String description;

    @Column(name = "date_added")
    private LocalDate dateAdded;

    @Column(name = "sort_position")
    private Integer sortPosition;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageFile() {
        return imageFile;
    }

    public Bear imageFile(String imageFile) {
        this.imageFile = imageFile;
        return this;
    }

    public void setImageFile(String imageFile) {
        this.imageFile = imageFile;
    }

    public String getDescription() {
        return description;
    }

    public Bear description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDateAdded() {
        return dateAdded;
    }

    public Bear dateAdded(LocalDate dateAdded) {
        this.dateAdded = dateAdded;
        return this;
    }

    public void setDateAdded(LocalDate dateAdded) {
        this.dateAdded = dateAdded;
    }

    public Integer getSortPosition() {
        return sortPosition;
    }

    public Bear sortPosition(Integer sortPosition) {
        this.sortPosition = sortPosition;
        return this;
    }

    public void setSortPosition(Integer sortPosition) {
        this.sortPosition = sortPosition;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bear)) {
            return false;
        }
        return id != null && id.equals(((Bear) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bear{" +
            "id=" + getId() +
            ", imageFile='" + getImageFile() + "'" +
            ", description='" + getDescription() + "'" +
            ", dateAdded='" + getDateAdded() + "'" +
            ", sortPosition=" + getSortPosition() +
            "}";
    }
}
