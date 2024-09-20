package com.example.team.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.thymeleaf.spring6.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ITemplateResolver;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:///C:/Users/ITWILL/Desktop/upload/"); // 실제 이미지가 저장된 경로
    }
    
//    @Bean
//    public ITemplateResolver yourTemplateResolver() {
//        SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();
//        resolver.setOrder(1);
//        resolver.setPrefix("classpath:/templates/"); // 템플릿 파일의 위치를 지정합니다.
//        resolver.setSuffix(".html");
//        resolver.setTemplateMode(TemplateMode.HTML);
//        resolver.setCacheable(true);
//        resolver.setCheckExistence(true); // 존재하지 않는 템플릿에 대한 예외 방지
//        return resolver;
//    }
}