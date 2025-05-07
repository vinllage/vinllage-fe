package org.koreait.global.validators;

/**
 * 데이터 검증을 위한 기본 틀
 * 모든 검증을 위한 클래스 정의시에는 Validator 인터페이스를 구현해야 함
 */
public interface Validator<T> {
    void check(T form);
}
