package com.bowerstechnologies.seamstress.repository;

import com.bowerstechnologies.seamstress.domain.CustomerOrder;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CustomerOrder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> {
}
