package com.bowerstechnologies.seamstress.web.rest;

import com.bowerstechnologies.seamstress.domain.CustomerOrder;
import com.bowerstechnologies.seamstress.repository.CustomerOrderRepository;
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
 * REST controller for managing {@link com.bowerstechnologies.seamstress.domain.CustomerOrder}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CustomerOrderResource {

    private final Logger log = LoggerFactory.getLogger(CustomerOrderResource.class);

    private static final String ENTITY_NAME = "customerOrder";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CustomerOrderRepository customerOrderRepository;

    public CustomerOrderResource(CustomerOrderRepository customerOrderRepository) {
        this.customerOrderRepository = customerOrderRepository;
    }

    /**
     * {@code POST  /customer-orders} : Create a new customerOrder.
     *
     * @param customerOrder the customerOrder to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new customerOrder, or with status {@code 400 (Bad Request)} if the customerOrder has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/customer-orders")
    public ResponseEntity<CustomerOrder> createCustomerOrder(@Valid @RequestBody CustomerOrder customerOrder) throws URISyntaxException {
        log.debug("REST request to save CustomerOrder : {}", customerOrder);
        if (customerOrder.getId() != null) {
            throw new BadRequestAlertException("A new customerOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerOrder result = customerOrderRepository.save(customerOrder);
        return ResponseEntity.created(new URI("/api/customer-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /customer-orders} : Updates an existing customerOrder.
     *
     * @param customerOrder the customerOrder to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated customerOrder,
     * or with status {@code 400 (Bad Request)} if the customerOrder is not valid,
     * or with status {@code 500 (Internal Server Error)} if the customerOrder couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/customer-orders")
    public ResponseEntity<CustomerOrder> updateCustomerOrder(@Valid @RequestBody CustomerOrder customerOrder) throws URISyntaxException {
        log.debug("REST request to update CustomerOrder : {}", customerOrder);
        if (customerOrder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomerOrder result = customerOrderRepository.save(customerOrder);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, customerOrder.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /customer-orders} : get all the customerOrders.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of customerOrders in body.
     */
    @GetMapping("/customer-orders")
    public ResponseEntity<List<CustomerOrder>> getAllCustomerOrders(Pageable pageable) {
        log.debug("REST request to get a page of CustomerOrders");
        Page<CustomerOrder> page = customerOrderRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /customer-orders/:id} : get the "id" customerOrder.
     *
     * @param id the id of the customerOrder to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the customerOrder, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/customer-orders/{id}")
    public ResponseEntity<CustomerOrder> getCustomerOrder(@PathVariable Long id) {
        log.debug("REST request to get CustomerOrder : {}", id);
        Optional<CustomerOrder> customerOrder = customerOrderRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(customerOrder);
    }

    /**
     * {@code DELETE  /customer-orders/:id} : delete the "id" customerOrder.
     *
     * @param id the id of the customerOrder to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/customer-orders/{id}")
    public ResponseEntity<Void> deleteCustomerOrder(@PathVariable Long id) {
        log.debug("REST request to delete CustomerOrder : {}", id);
        customerOrderRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
