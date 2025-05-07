package org.koreait.global.validators;

import org.koreait.global.exceptions.BadRequestException;

public interface RequiredFieldValidator {

    // 문자열 필수 여부 체크
    default void checkString(String str, String message) {
        if (str == null || str.isBlank()) {
            throw new BadRequestException(message);
        }
    }

    // True 여부 체크
    default void checkTrue(boolean result, String message) {
        if (!result) {
            throw new BadRequestException(message);
        }
    }
}
