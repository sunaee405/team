package com.example.team.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAdminEntity is a Querydsl query type for AdminEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAdminEntity extends EntityPathBase<AdminEntity> {

    private static final long serialVersionUID = -1330990483L;

    public static final QAdminEntity adminEntity = new QAdminEntity("adminEntity");

    public final StringPath admId = createString("admId");

    public final StringPath admName = createString("admName");

    public final NumberPath<Long> admNo = createNumber("admNo", Long.class);

    public final StringPath admPw = createString("admPw");

    public QAdminEntity(String variable) {
        super(AdminEntity.class, forVariable(variable));
    }

    public QAdminEntity(Path<? extends AdminEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAdminEntity(PathMetadata metadata) {
        super(AdminEntity.class, metadata);
    }

}

