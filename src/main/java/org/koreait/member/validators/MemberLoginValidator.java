package org.koreait.member.validators;

import org.koreait.global.validators.RequiredFieldValidator;
import org.koreait.global.validators.Validator;
import org.koreait.member.controllers.LoginForm;
import org.koreait.member.entities.Member;
import org.koreait.member.services.MemberInfoService;
import org.mindrot.jbcrypt.BCrypt;

/**
 * 로그인 유효성 검사
 *
 */
public class MemberLoginValidator implements Validator<LoginForm>, RequiredFieldValidator {
    private final MemberInfoService infoService;

    public MemberLoginValidator(MemberInfoService infoService) {
        this.infoService = infoService;
    }

    @Override
    public void check(LoginForm form) {
        String email = form.getEmail();
        String password = form.getPassword();

        // 필수항목 검증 - 이메일, 비밀번호
        checkString(email, "이메일을 입력하세요.");
        checkString(password, "비밀번호를 입력하세요.");

        String message = "이메일 또는 비밀번호가 일치하지 않습니다.";

        // 등록된 회원인지 검증
        Member member = infoService.get(email);
        checkTrue(member != null, message);

        // 비밀번호 일치여부 체크
        checkTrue(BCrypt.checkpw(password, member.getPassword()), message);
    }
}
