package org.koreait.global.exceptions;

/**
 * 검증 실패 또는 지정된 요청 방식이 아닌 경우 발생시킬 수 있는 공통 예외
 *
 */
public class BadRequestException extends CommonException {
    public BadRequestException() {
        this("잘못된 요청입니다.");
    }

    public BadRequestException(String message) {
        super(message, 400);
    }
}
