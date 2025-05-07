package org.koreait.global.exceptions;

/**
 * 요청한 리소스를 찾지 못한 경우 발생할 수 있는 공통 예외
 *
 */
public class NotFoundException extends CommonException {
    public NotFoundException() {
        this("데이터를 찾을 수 없습니다.");
    }

    public NotFoundException(String message) {
        super(message, 404);
    }
}
