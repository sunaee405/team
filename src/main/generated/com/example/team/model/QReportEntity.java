package com.example.team.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReportEntity is a Querydsl query type for ReportEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReportEntity extends EntityPathBase<ReportEntity> {

    private static final long serialVersionUID = -497654980L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReportEntity reportEntity = new QReportEntity("reportEntity");

    public final QMemberEntity memberNo;

    public final QProductEntity productNo;

    public final StringPath REP_CONTENT = createString("REP_CONTENT");

    public final DateTimePath<java.time.LocalDateTime> REP_DATE = createDateTime("REP_DATE", java.time.LocalDateTime.class);

    public final NumberPath<Long> REP_NO = createNumber("REP_NO", Long.class);

    public final QDetailCodeEntity resultDetail;

    public final QDetailCodeEntity sectionDetail;

    public final QDetailCodeEntity statusDetail;

    public QReportEntity(String variable) {
        this(ReportEntity.class, forVariable(variable), INITS);
    }

    public QReportEntity(Path<? extends ReportEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReportEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReportEntity(PathMetadata metadata, PathInits inits) {
        this(ReportEntity.class, metadata, inits);
    }

    public QReportEntity(Class<? extends ReportEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.memberNo = inits.isInitialized("memberNo") ? new QMemberEntity(forProperty("memberNo")) : null;
        this.productNo = inits.isInitialized("productNo") ? new QProductEntity(forProperty("productNo")) : null;
        this.resultDetail = inits.isInitialized("resultDetail") ? new QDetailCodeEntity(forProperty("resultDetail"), inits.get("resultDetail")) : null;
        this.sectionDetail = inits.isInitialized("sectionDetail") ? new QDetailCodeEntity(forProperty("sectionDetail"), inits.get("sectionDetail")) : null;
        this.statusDetail = inits.isInitialized("statusDetail") ? new QDetailCodeEntity(forProperty("statusDetail"), inits.get("statusDetail")) : null;
    }

}

