package org.koreait.member.validators;

import org.koreait.global.validators.MobileValidator;
import org.koreait.global.validators.RequiredFieldValidator;
import org.koreait.global.validators.Validator;
import org.koreait.member.controllers.JoinForm;

public class MemberUpdateValidator implements Validator<JoinForm>, MobileValidator, RequiredFieldValidator {
    @Override
    public void check(JoinForm form) {

        String password = form.getPassword();
        String confirmPassword = form.getConfirmPassword();
        if (password != null && !password.isBlank()) {
            checkTrue(password.length() >= 8, "비밀번호는 8자리 이상 입력하세요.");
            checkTrue(confirmPassword != null && confirmPassword.equals(password), "입력하신 비밀번호가 일치하지 않습니다.");
        }

        String mobile = form.getMobile();
        if (mobile != null && !mobile.isBlank()) {
            checkTrue(checkMobile(mobile), "휴대전화번호 형식이 아닙니다.");
        }
    }
}
