package com.example.team.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMemberEntity is a Querydsl query type for MemberEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberEntity extends EntityPathBase<MemberEntity> {

    private static final long serialVersionUID = -1488161758L;

    public static final QMemberEntity memberEntity = new QMemberEntity("memberEntity");

    public final DateTimePath<java.time.LocalDateTime> MEM_INPUT = createDateTime("MEM_INPUT", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> MEM_OUT = createDateTime("MEM_OUT", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> MEM_RESPITE = createDateTime("MEM_RESPITE", java.time.LocalDateTime.class);

    public final StringPath MEM_SNS = createString("MEM_SNS");

    public final StringPath MEM_STATUS = createString("MEM_STATUS");

    public final StringPath memBirth = createString("memBirth");

    public final StringPath memEmail = createString("memEmail");

    public final StringPath memGender = createString("memGender");

    public final StringPath memId = createString("memId");

    public final StringPath memName = createString("memName");

    public final StringPath memNick = createString("memNick");

    public final NumberPath<Long> memNo = createNumber("memNo", Long.class);

    public final StringPath memPw = createString("memPw");

    public final StringPath memTel = createString("memTel");

    public QMemberEntity(String variable) {
        super(MemberEntity.class, forVariable(variable));
    }

    public QMemberEntity(Path<? extends MemberEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMemberEntity(PathMetadata metadata) {
        super(MemberEntity.class, metadata);
    }

}

