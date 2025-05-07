package org.koreait.member.controllers;

import lombok.Data;

@Data
public class JoinForm {
    private String email;
    private String password;
    private String confirmPassword;
    private String name;
    private String mobile;
    private boolean terms;
}
