package org.koreait.global.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.koreait.member.services.MemberJoinService;
import org.koreait.member.services.MemberService;

public class ServiceContainerTest {

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
        System.out.println(service);
    }
}
