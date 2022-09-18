package com.webstore.webStore.utils;

import com.sun.istack.NotNull;
import lombok.NoArgsConstructor;
import org.joda.time.DateTime;
import org.springframework.beans.BeanWrapper;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

@NoArgsConstructor
public class WSRowMapper<T> extends BeanPropertyRowMapper<T> {

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
