package com.bowerstechnologies.seamstress.web.rest;

import com.bowerstechnologies.seamstress.domain.Seamstress;
import com.bowerstechnologies.seamstress.repository.SeamstressRepository;
import com.bowerstechnologies.seamstress.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.bowerstechnologies.seamstress.domain.Seamstress}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SeamstressResource {

    private final Logger log = LoggerFactory.getLogger(SeamstressResource.class);

    private static final String ENTITY_NAME = "seamstress";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SeamstressRepository seamstressRepository;

    public SeamstressResource(SeamstressRepository seamstressRepository) {
        this.seamstressRepository = seamstressRepository;
    }

    /**
     * {@code POST  /seamstresses} : Create a new seamstress.
     *
     * @param seamstress the seamstress to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new seamstress, or with status {@code 400 (Bad Request)} if the seamstress has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/seamstresses")
    public ResponseEntity<Seamstress> createSeamstress(@Valid @RequestBody Seamstress seamstress) throws URISyntaxException {
        log.debug("REST request to save Seamstress : {}", seamstress);
        if (seamstress.getId() != null) {
            throw new BadRequestAlertException("A new seamstress cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Seamstress result = seamstressRepository.save(seamstress);
        return ResponseEntity.created(new URI("/api/seamstresses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /seamstresses} : Updates an existing seamstress.
     *
     * @param seamstress the seamstress to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated seamstress,
     * or with status {@code 400 (Bad Request)} if the seamstress is not valid,
     * or with status {@code 500 (Internal Server Error)} if the seamstress couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/seamstresses")
    public ResponseEntity<Seamstress> updateSeamstress(@Valid @RequestBody Seamstress seamstress) throws URISyntaxException {
        log.debug("REST request to update Seamstress : {}", seamstress);
        if (seamstress.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Seamstress result = seamstressRepository.save(seamstress);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, seamstress.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /seamstresses} : get all the seamstresses.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of seamstresses in body.
     */
    @GetMapping("/seamstresses")
    public ResponseEntity<List<Seamstress>> getAllSeamstresses(Pageable pageable) {
        log.debug("REST request to get a page of Seamstresses");
        Page<Seamstress> page = seamstressRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /seamstresses/:id} : get the "id" seamstress.
     *
     * @param id the id of the seamstress to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the seamstress, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/seamstresses/{id}")
    public ResponseEntity<Seamstress> getSeamstress(@PathVariable Long id) {
        log.debug("REST request to get Seamstress : {}", id);
        Optional<Seamstress> seamstress = seamstressRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(seamstress);
    }

    /**
     * {@code DELETE  /seamstresses/:id} : delete the "id" seamstress.
     *
     * @param id the id of the seamstress to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/seamstresses/{id}")
    public ResponseEntity<Void> deleteSeamstress(@PathVariable Long id) {
        log.debug("REST request to delete Seamstress : {}", id);
        seamstressRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
