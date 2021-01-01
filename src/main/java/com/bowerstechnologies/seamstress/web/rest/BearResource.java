package com.bowerstechnologies.seamstress.web.rest;

import com.bowerstechnologies.seamstress.domain.Bear;
import com.bowerstechnologies.seamstress.repository.BearRepository;
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
 * REST controller for managing {@link com.bowerstechnologies.seamstress.domain.Bear}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BearResource {

    private final Logger log = LoggerFactory.getLogger(BearResource.class);

    private static final String ENTITY_NAME = "bear";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BearRepository bearRepository;

    public BearResource(BearRepository bearRepository) {
        this.bearRepository = bearRepository;
    }

    /**
     * {@code POST  /bears} : Create a new bear.
     *
     * @param bear the bear to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bear, or with status {@code 400 (Bad Request)} if the bear has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bears")
    public ResponseEntity<Bear> createBear(@Valid @RequestBody Bear bear) throws URISyntaxException {
        log.debug("REST request to save Bear : {}", bear);
        if (bear.getId() != null) {
            throw new BadRequestAlertException("A new bear cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Bear result = bearRepository.save(bear);
        return ResponseEntity.created(new URI("/api/bears/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bears} : Updates an existing bear.
     *
     * @param bear the bear to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bear,
     * or with status {@code 400 (Bad Request)} if the bear is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bear couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bears")
    public ResponseEntity<Bear> updateBear(@Valid @RequestBody Bear bear) throws URISyntaxException {
        log.debug("REST request to update Bear : {}", bear);
        if (bear.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Bear result = bearRepository.save(bear);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, bear.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bears} : get all the bears.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bears in body.
     */
    @GetMapping("/bears")
    public ResponseEntity<List<Bear>> getAllBears(Pageable pageable) {
        log.debug("REST request to get a page of Bears");
        Page<Bear> page = bearRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /bears/:id} : get the "id" bear.
     *
     * @param id the id of the bear to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bear, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bears/{id}")
    public ResponseEntity<Bear> getBear(@PathVariable Long id) {
        log.debug("REST request to get Bear : {}", id);
        Optional<Bear> bear = bearRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bear);
    }

    /**
     * {@code DELETE  /bears/:id} : delete the "id" bear.
     *
     * @param id the id of the bear to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bears/{id}")
    public ResponseEntity<Void> deleteBear(@PathVariable Long id) {
        log.debug("REST request to delete Bear : {}", id);
        bearRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
