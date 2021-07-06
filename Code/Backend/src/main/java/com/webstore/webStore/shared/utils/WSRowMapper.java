package com.webstore.webStore.shared.utils;

import com.sun.istack.NotNull;
import org.joda.time.DateTime;
import org.springframework.beans.BeanWrapper;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

public class WSRowMapper<T> extends BeanPropertyRowMapper<T> {

    public WSRowMapper() {
    }

    public static <T> WSRowMapper<T> newInstance(@NotNull Class<T> mappedClass) {
        WSRowMapper<T> newInstance = new WSRowMapper<>();
        newInstance.setMappedClass(mappedClass);
        return newInstance;
    }

    @Override
    protected void initBeanWrapper(BeanWrapper beanWrapper) {
        beanWrapper.registerCustomEditor(DateTime.class, new WSDateTimeEditor());
    }

}
