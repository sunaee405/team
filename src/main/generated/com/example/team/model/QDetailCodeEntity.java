package com.example.team.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDetailCodeEntity is a Querydsl query type for DetailCodeEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDetailCodeEntity extends EntityPathBase<DetailCodeEntity> {

    private static final long serialVersionUID = -2129263130L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDetailCodeEntity detailCodeEntity = new QDetailCodeEntity("detailCodeEntity");

    public final StringPath DCO_ID = createString("DCO_ID");

    public final StringPath DCO_VALUE = createString("DCO_VALUE");

    public final NumberPath<Long> ID = createNumber("ID", Long.class);

    public final QSubCodeEntity subCode;

    public QDetailCodeEntity(String variable) {
        this(DetailCodeEntity.class, forVariable(variable), INITS);
    }

    public QDetailCodeEntity(Path<? extends DetailCodeEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDetailCodeEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDetailCodeEntity(PathMetadata metadata, PathInits inits) {
        this(DetailCodeEntity.class, metadata, inits);
    }

    public QDetailCodeEntity(Class<? extends DetailCodeEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.subCode = inits.isInitialized("subCode") ? new QSubCodeEntity(forProperty("subCode"), inits.get("subCode")) : null;
    }

}

