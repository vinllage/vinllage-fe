package org.koreait.member.services;

import org.apache.ibatis.session.SqlSession;
import org.koreait.global.configs.DBConn;
import org.koreait.global.services.Bean;
import org.koreait.global.services.Configuration;
import org.koreait.member.mappers.MemberMapper;
import org.koreait.member.validators.MemberJoinValidator;
import org.koreait.member.validators.MemberLoginValidator;
import org.koreait.member.validators.MemberUpdateValidator;

@Configuration
public class MemberService {

    public MemberMapper memberMapper() {
        SqlSession session = DBConn.getInstance().getSession();
        return session.getMapper(MemberMapper.class);
    }

    @Bean
    public MemberJoinValidator joinValidator() {
        return new MemberJoinValidator(memberMapper());
    }

    @Bean
    public MemberJoinService joinService() {
        return new MemberJoinService(memberMapper(), joinValidator());
    }

    @Bean
    public MemberInfoService infoService() {
        return new MemberInfoService(memberMapper());
    }

    @Bean
    public MemberLoginValidator loginValidator() {
        return new MemberLoginValidator(infoService());
    }

    @Bean
    public MemberLoginService loginService() {
        return new MemberLoginService(loginValidator(), infoService());
    }

    @Bean
    public MemberUpdateValidator updateValidator() {
        return new MemberUpdateValidator();
    }

    @Bean
    public MemberUpdateService updateService() {
        return new MemberUpdateService(memberMapper(), updateValidator());
    }
}
