package org.koreait.member.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.koreait.global.services.ServiceContainer;
import org.koreait.member.controllers.JoinForm;

public class MemberJoinServiceTest {

    private ServiceContainer container;

    @BeforeEach
    void init() {
        container = ServiceContainer.getInstance();
        container.register(MemberService.class);
        container.init();
    }

    @Test
    void test1() {
        MemberJoinService service = ServiceContainer.getBean(MemberJoinService.class);
        JoinForm form = new JoinForm();
        form.setEmail("user04@test.org");
        form.setName("사용자03");
        form.setPassword("12345678");
        form.setTerms(true);
        form.setConfirmPassword("12345678");
        form.setMobile("010-3481-2101");
        service.process(form);
    }
}
