package org.koreait.member.services;

import org.koreait.global.validators.Validator;
import org.koreait.member.MemberSession;
import org.koreait.member.controllers.LoginForm;
import org.koreait.member.entities.Member;

/**
 * 로그인 처리 서비스
 *
 */
public class MemberLoginService {
    private final Validator<LoginForm> validator;
    private final MemberInfoService infoService;

    // 의존성 주입
    public MemberLoginService(Validator<LoginForm> validator, MemberInfoService infoService) {
        this.validator = validator;
        this.infoService = infoService;
    }

    // 로그인 처리
    public void process(LoginForm form) {

        // 유효성 검사
        validator.check(form);

        // 로그인 처리 S
        Member member = infoService.get(form.getEmail());
        MemberSession.setMember(member);
        // 로그인 처리 E
    }
}
