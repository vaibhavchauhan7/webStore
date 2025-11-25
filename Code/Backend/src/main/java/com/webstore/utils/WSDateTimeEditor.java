package com.webstore.utils;

import java.beans.PropertyEditorSupport;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class WSDateTimeEditor extends PropertyEditorSupport {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    @Override
    public String getAsText() {
        LocalDateTime value = getValue();
        return (value != null) ? value.format(FORMATTER) : "";
    }

    @Override
    public void setAsText(final String text) throws IllegalArgumentException {
        if (text == null || text.isEmpty()) setValue(null);
        else setValue(LocalDateTime.parse(text, FORMATTER));
    }

    @Override
    public LocalDateTime getValue() {
        return (LocalDateTime) super.getValue();
    }

    @Override
    public void setValue(final Object value) {
        if (value == null || value instanceof LocalDateTime) super.setValue(value);
        else throw new IllegalArgumentException("Cannot convert value to LocalDateTime: " + value);
    }

}
