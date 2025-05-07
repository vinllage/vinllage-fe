package org.koreait.member.validators;

import org.koreait.global.validators.EmailValidator;
import org.koreait.global.validators.MobileValidator;
import org.koreait.global.validators.RequiredFieldValidator;
import org.koreait.global.validators.Validator;
import org.koreait.member.controllers.JoinForm;
import org.koreait.member.mappers.MemberMapper;

public class MemberJoinValidator implements Validator<JoinForm>, RequiredFieldValidator, MobileValidator, EmailValidator {

    private final MemberMapper mapper;

    public MemberJoinValidator(MemberMapper mapper) {
        this.mapper = mapper;
    }

    /**
     * 회원 가입 데이터 유효성 검사
     * 1. 필수항목 - 이메일, 비밀번호, 비밀번호 확인, 휴대전화 번호, 약관 동의
     * 2. 이메일 중복 여부 - 이메일로 로그인을 하므로 중복은 있으면 안됨
     * 3. 이메일 형식 체크
     * 4. 비밀번호는 8자리 이상 체크
     * 5. 휴대전화번호 형식 체크
     */
    @Override
    public void check(JoinForm form) {
        String email = form.getEmail();
        String password = form.getPassword();
        String confirmPassword = form.getConfirmPassword();
        String mobile = form.getMobile();
        String name = form.getName();

        // 1. 필수항목 - 이메일, 비밀번호, 비밀번호 확인, 회원명, 휴대전화 번호, 약관 동의 S
        checkString(email, "이메일을 입력하세요.");
        checkString(password, "비밀번호를 입력하세요.");
        checkString(confirmPassword, "비밀번호를 확인하세요.");
        checkString(name, "회원명을 입력하세요.");
        checkString(mobile, "휴대전화번호를 입력하세요.");
        checkTrue(form.isTerms(), "약관에 동의해 주세요.");
        // 1. 필수항목 - 이메일, 비밀번호, 비밀번호 확인, 회원명, 휴대전화 번호, 약관 동의 E

        // 2. 이메일 중복 여부 - 이메일로 로그인을 하므로 중복은 있으면 안됨
        checkTrue(mapper.exists(email) == 0, "이미 가입된 이메일 입니다.");

        // 3. 이메일 형식 체크
        checkTrue(checkEmail(email), "이메일 형식이 아닙니다.");

        // 4. 비밀번호는 8자리 이상 체크
        checkTrue(password.length() >= 8, "비밀번호는 8자리 이상 입력하세요.");

        // 5. 휴대전화번호 형식 체크
        checkTrue(checkMobile(mobile), "휴대전화번호 형식이 아닙니다.");
    }
}
