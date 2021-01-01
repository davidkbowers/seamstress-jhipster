package com.bowerstechnologies.seamstress.web.rest;

import com.bowerstechnologies.seamstress.SeamstressOnCallApp;
import com.bowerstechnologies.seamstress.domain.Bear;
import com.bowerstechnologies.seamstress.repository.BearRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link BearResource} REST controller.
 */
@SpringBootTest(classes = SeamstressOnCallApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BearResourceIT {

    private static final String DEFAULT_IMAGE_FILE = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_FILE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_ADDED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_ADDED = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_SORT_POSITION = 1;
    private static final Integer UPDATED_SORT_POSITION = 2;

    @Autowired
    private BearRepository bearRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBearMockMvc;

    private Bear bear;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bear createEntity(EntityManager em) {
        Bear bear = new Bear()
            .imageFile(DEFAULT_IMAGE_FILE)
            .description(DEFAULT_DESCRIPTION)
            .dateAdded(DEFAULT_DATE_ADDED)
            .sortPosition(DEFAULT_SORT_POSITION);
        return bear;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bear createUpdatedEntity(EntityManager em) {
        Bear bear = new Bear()
            .imageFile(UPDATED_IMAGE_FILE)
            .description(UPDATED_DESCRIPTION)
            .dateAdded(UPDATED_DATE_ADDED)
            .sortPosition(UPDATED_SORT_POSITION);
        return bear;
    }

    @BeforeEach
    public void initTest() {
        bear = createEntity(em);
    }

    @Test
    @Transactional
    public void createBear() throws Exception {
        int databaseSizeBeforeCreate = bearRepository.findAll().size();
        // Create the Bear
        restBearMockMvc.perform(post("/api/bears")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bear)))
            .andExpect(status().isCreated());

        // Validate the Bear in the database
        List<Bear> bearList = bearRepository.findAll();
        assertThat(bearList).hasSize(databaseSizeBeforeCreate + 1);
        Bear testBear = bearList.get(bearList.size() - 1);
        assertThat(testBear.getImageFile()).isEqualTo(DEFAULT_IMAGE_FILE);
        assertThat(testBear.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testBear.getDateAdded()).isEqualTo(DEFAULT_DATE_ADDED);
        assertThat(testBear.getSortPosition()).isEqualTo(DEFAULT_SORT_POSITION);
    }

    @Test
    @Transactional
    public void createBearWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bearRepository.findAll().size();

        // Create the Bear with an existing ID
        bear.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBearMockMvc.perform(post("/api/bears")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bear)))
            .andExpect(status().isBadRequest());

        // Validate the Bear in the database
        List<Bear> bearList = bearRepository.findAll();
        assertThat(bearList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkImageFileIsRequired() throws Exception {
        int databaseSizeBeforeTest = bearRepository.findAll().size();
        // set the field null
        bear.setImageFile(null);

        // Create the Bear, which fails.


        restBearMockMvc.perform(post("/api/bears")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bear)))
            .andExpect(status().isBadRequest());

        List<Bear> bearList = bearRepository.findAll();
        assertThat(bearList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBears() throws Exception {
        // Initialize the database
        bearRepository.saveAndFlush(bear);

        // Get all the bearList
        restBearMockMvc.perform(get("/api/bears?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bear.getId().intValue())))
            .andExpect(jsonPath("$.[*].imageFile").value(hasItem(DEFAULT_IMAGE_FILE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].dateAdded").value(hasItem(DEFAULT_DATE_ADDED.toString())))
            .andExpect(jsonPath("$.[*].sortPosition").value(hasItem(DEFAULT_SORT_POSITION)));
    }
    
    @Test
    @Transactional
    public void getBear() throws Exception {
        // Initialize the database
        bearRepository.saveAndFlush(bear);

        // Get the bear
        restBearMockMvc.perform(get("/api/bears/{id}", bear.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bear.getId().intValue()))
            .andExpect(jsonPath("$.imageFile").value(DEFAULT_IMAGE_FILE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.dateAdded").value(DEFAULT_DATE_ADDED.toString()))
            .andExpect(jsonPath("$.sortPosition").value(DEFAULT_SORT_POSITION));
    }
    @Test
    @Transactional
    public void getNonExistingBear() throws Exception {
        // Get the bear
        restBearMockMvc.perform(get("/api/bears/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBear() throws Exception {
        // Initialize the database
        bearRepository.saveAndFlush(bear);

        int databaseSizeBeforeUpdate = bearRepository.findAll().size();

        // Update the bear
        Bear updatedBear = bearRepository.findById(bear.getId()).get();
        // Disconnect from session so that the updates on updatedBear are not directly saved in db
        em.detach(updatedBear);
        updatedBear
            .imageFile(UPDATED_IMAGE_FILE)
            .description(UPDATED_DESCRIPTION)
            .dateAdded(UPDATED_DATE_ADDED)
            .sortPosition(UPDATED_SORT_POSITION);

        restBearMockMvc.perform(put("/api/bears")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBear)))
            .andExpect(status().isOk());

        // Validate the Bear in the database
        List<Bear> bearList = bearRepository.findAll();
        assertThat(bearList).hasSize(databaseSizeBeforeUpdate);
        Bear testBear = bearList.get(bearList.size() - 1);
        assertThat(testBear.getImageFile()).isEqualTo(UPDATED_IMAGE_FILE);
        assertThat(testBear.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testBear.getDateAdded()).isEqualTo(UPDATED_DATE_ADDED);
        assertThat(testBear.getSortPosition()).isEqualTo(UPDATED_SORT_POSITION);
    }

    @Test
    @Transactional
    public void updateNonExistingBear() throws Exception {
        int databaseSizeBeforeUpdate = bearRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBearMockMvc.perform(put("/api/bears")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bear)))
            .andExpect(status().isBadRequest());

        // Validate the Bear in the database
        List<Bear> bearList = bearRepository.findAll();
        assertThat(bearList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBear() throws Exception {
        // Initialize the database
        bearRepository.saveAndFlush(bear);

        int databaseSizeBeforeDelete = bearRepository.findAll().size();

        // Delete the bear
        restBearMockMvc.perform(delete("/api/bears/{id}", bear.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Bear> bearList = bearRepository.findAll();
        assertThat(bearList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
