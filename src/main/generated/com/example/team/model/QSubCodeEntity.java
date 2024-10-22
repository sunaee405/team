package com.example.team.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSubCodeEntity is a Querydsl query type for SubCodeEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSubCodeEntity extends EntityPathBase<SubCodeEntity> {

    private static final long serialVersionUID = -862777813L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSubCodeEntity subCodeEntity = new QSubCodeEntity("subCodeEntity");

    public final NumberPath<Long> ID = createNumber("ID", Long.class);

    public final QMainCodeEntity mainCode;

    public final StringPath SCO_ID = createString("SCO_ID");

    public final StringPath SCO_VALUE = createString("SCO_VALUE");

    public QSubCodeEntity(String variable) {
        this(SubCodeEntity.class, forVariable(variable), INITS);
    }

    public QSubCodeEntity(Path<? extends SubCodeEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSubCodeEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSubCodeEntity(PathMetadata metadata, PathInits inits) {
        this(SubCodeEntity.class, metadata, inits);
    }

    public QSubCodeEntity(Class<? extends SubCodeEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.mainCode = inits.isInitialized("mainCode") ? new QMainCodeEntity(forProperty("mainCode")) : null;
    }

}

