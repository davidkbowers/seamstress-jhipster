package com.bowerstechnologies.seamstress.repository;

import com.bowerstechnologies.seamstress.domain.Seamstress;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Seamstress entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SeamstressRepository extends JpaRepository<Seamstress, Long> {
}
