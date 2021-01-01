package com.bowerstechnologies.seamstress.repository;

import com.bowerstechnologies.seamstress.domain.Bear;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Bear entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BearRepository extends JpaRepository<Bear, Long> {
}
