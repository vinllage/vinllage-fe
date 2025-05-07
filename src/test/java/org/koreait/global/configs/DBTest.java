package org.koreait.global.configs;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Connection;

public class DBTest {
    private DBConn config;
    @BeforeEach
    void init() {
        config = DBConn.getInstance();
    }

    @Test
    void DBConnectionTest() throws Exception {

        DataSource ds = config.dataSource();
        Connection conn = ds.getConnection();
        System.out.println(conn);
    }

    @Test
    void SqlSessionFactory() {
        SqlSessionFactory sqlSessionFactory = config.sqlSessionFactory();
        System.out.println(sqlSessionFactory);
    }

    @Test
    void SqlSessionTest() {
        SqlSession session = config.getSession();
        System.out.println(session);
    }
}
