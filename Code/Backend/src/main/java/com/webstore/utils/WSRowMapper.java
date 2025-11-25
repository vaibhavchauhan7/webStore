package com.webstore.utils;

import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.beans.BeanWrapper;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

import java.time.LocalDateTime;

@NoArgsConstructor
public class WSRowMapper<T> extends BeanPropertyRowMapper<T> {

    public static <T> WSRowMapper<T> newInstance(@NonNull Class<T> mappedClass) {
        WSRowMapper<T> newInstance = new WSRowMapper<>();
        newInstance.setMappedClass(mappedClass);
        return newInstance;
    }

    @Override
    protected void initBeanWrapper(BeanWrapper beanWrapper) {
        beanWrapper.registerCustomEditor(LocalDateTime.class, new WSDateTimeEditor());
    }

}
