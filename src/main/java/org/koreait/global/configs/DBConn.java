package org.koreait.global.configs;

import org.apache.ibatis.logging.slf4j.Slf4jImpl;
import org.apache.ibatis.mapping.Environment;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.ibatis.transaction.TransactionFactory;
import org.apache.ibatis.transaction.jdbc.JdbcTransactionFactory;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.koreait.member.mappers.MemberMapper;

/**
 * 데이터베이스 연결 및 SqlSession 객체 생성
 * DB 연결 객체를 매번 초기화 할 필요는 없으므로 싱글톤으로 객체를 생성할 수 있도록 구성한다.
 *
 */
public class DBConn {

    private static DBConn instance;

    private SqlSessionFactory sqlSessionFactory;

    private DBConn() {
        sqlSessionFactory = sqlSessionFactory();
    }

    public DataSource dataSource() {
        // 연결 설정 S
        // 환경변수
        String database = System.getenv("db");
        String username = System.getenv("username");
        String password = System.getenv("password");

        DataSource ds = new DataSource();
        ds.setDriverClassName("com.mysql.cj.jdbc.Driver");
        ds.setUrl("jdbc:mysql://" + database);
        ds.setUsername(username);
        ds.setPassword(password);
        // 연결 설정 E

        // 커넥션 풀 설정 S
        ds.setInitialSize(2);
        ds.setMaxActive(10);
        ds.setTestWhileIdle(true);
        ds.setMinEvictableIdleTimeMillis(1000 * 60);
        ds.setTimeBetweenEvictionRunsMillis(1000 * 3);
        // 커넥션 풀 설정 E
        return ds;
    }

    public SqlSessionFactory sqlSessionFactory() {
        TransactionFactory transactionFactory = new JdbcTransactionFactory();
        Environment environment = new Environment("development", transactionFactory, dataSource());
        Configuration configuration = new Configuration(environment);
        configuration.addMapper(MemberMapper.class);
        configuration.setLogImpl(Slf4jImpl.class);

        return new SqlSessionFactoryBuilder().build(configuration);
    }

    public SqlSession getSession(boolean autoCommit) {
        return sqlSessionFactory.openSession(autoCommit);
    }

    public SqlSession getSession() {
        return getSession(true);
    }

    public static DBConn getInstance() {
        if (instance == null) {
            instance = new DBConn();
        }

        return instance;
    }
}
