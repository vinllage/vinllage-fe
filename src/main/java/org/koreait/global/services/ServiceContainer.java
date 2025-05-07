package org.koreait.global.services;

import org.koreait.member.services.MemberService;

import java.lang.reflect.Method;
import java.util.*;

public class ServiceContainer {

    private static ServiceContainer instance;

    // 생성된 객체를 담을 컨테이너 공간
    private final Map<Class<?>, Object> objects;

    // 동적 로드할 Class 클래스 객체 목록
    private final Set<Class<?>> classes;

    private ServiceContainer() {
        objects = new HashMap<>();
        classes = new HashSet<>();
    }

    // 로드할 Class 클래스 객체 등록
    public void register(Collection<Class<?>> classes) {
        this.classes.addAll(classes);
    }

    // 로드할 Class 클래스 객체 등록
    public void register(Class<?>... classes) {
       Collections.addAll(this.classes, classes);
    }


    /**
     * 동적 객체 생성
     *
     * 생성된 객체는 컨테이너에 담아 필요할때 꺼내쓸 수 있도록 한다.
     */
    public void init() {
        for (Class<?> clazz : classes) {
            // @Configuration 애노테이션이 적용된 클래스만 @Bean(컨테이너가 관리할 객체)를 정의할 수 있음
            if (clazz.getAnnotation(Configuration.class) == null) {
                continue;
            }

            try {
                // 객체 동적 생성
                Object obj = clazz.getDeclaredConstructor().newInstance();
                Method[] methods = clazz.getDeclaredMethods();
                for (Method method : methods) {
                    /**
                     * @Bean 애노테이션이 적용된 메서드라면 동적 호출하여 객체 생성
                     *
                     */
                    if (method.getAnnotation(Bean.class) == null) {
                        continue;
                    }

                    // 동적 메서드 호출하여 컨테이너가 관리할 객체 생성
                    Object bean = method.invoke(obj);

                    // 생성된 객체 컨테이너 저장공간에 저장
                    objects.put(bean.getClass(), bean);
                } // endfor
            } catch (Exception e) {
                e.printStackTrace();
            }
        } // endfor
    }

    /**
     * 컨테이너에서 사용할 객체 조회
     *
     * @param clazz
     * @return
     * @param <T>
     */
    public <T> T _getBean(Class<T> clazz) {
        return (T)objects.get(clazz);
    }

    public static <T> T getBean(Class<T> clazz) {
        return getInstance()._getBean(clazz);
    }

    /**
     * 싱글톤으로 객체 생성
     * @return
     */
    public static ServiceContainer getInstance() {
        if (instance == null) {
            instance = new ServiceContainer();

            instance.register(MemberService.class);
            instance.init();
        }

        return instance;
    }
}
