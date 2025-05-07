package org.koreait.global.exceptions;

import lombok.Getter;

/**
 * 작성하는 모든 예외가 상속해야 하는 공통적인 예외
 */
@Getter
public class CommonException extends RuntimeException {
    private final int status;

    public CommonException(String message, int status) {
        super(message);
        this.status = status;
    }
}
