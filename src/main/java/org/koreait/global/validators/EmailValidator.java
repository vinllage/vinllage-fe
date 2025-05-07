package org.koreait.global.validators;

public interface EmailValidator {
    default boolean checkEmail(String email) {
        return email.matches( "^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$");
    }
}
