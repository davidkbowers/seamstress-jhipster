package com.bowerstechnologies.seamstress.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.bowerstechnologies.seamstress.web.rest.TestUtil;

public class SeamstressTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Seamstress.class);
        Seamstress seamstress1 = new Seamstress();
        seamstress1.setId(1L);
        Seamstress seamstress2 = new Seamstress();
        seamstress2.setId(seamstress1.getId());
        assertThat(seamstress1).isEqualTo(seamstress2);
        seamstress2.setId(2L);
        assertThat(seamstress1).isNotEqualTo(seamstress2);
        seamstress1.setId(null);
        assertThat(seamstress1).isNotEqualTo(seamstress2);
    }
}
