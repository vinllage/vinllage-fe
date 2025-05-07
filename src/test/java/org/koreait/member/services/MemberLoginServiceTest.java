package org.koreait.member.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.koreait.global.services.ServiceContainer;
import org.koreait.member.MemberSession;
import org.koreait.member.controllers.LoginForm;
import org.koreait.member.entities.Member;

import static org.junit.jupiter.api.Assertions.assertTrue;

@DisplayName("로그인 기능 테스트")
public class MemberLoginServiceTest {

    private ServiceContainer container;

    @BeforeEach
    void init() {
        container = ServiceContainer.getInstance();
        container.register(MemberService.class);
        container.init();
    }

    @Test
    void test1() {
        MemberLoginService service = ServiceContainer.getBean(MemberLoginService.class);
        LoginForm form = new LoginForm();
        form.setEmail("user04@test.org");
        form.setPassword("12345678");
        service.process(form);

        assertTrue(MemberSession.isLogin());
        Member member = MemberSession.getMember();
        System.out.println(member);
    }
}
