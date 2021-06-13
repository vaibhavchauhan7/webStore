package com.webstore.webStore.shared.utils;

import org.joda.time.DateTime;

import java.beans.PropertyEditorSupport;

public class WSDateTimeEditor extends PropertyEditorSupport {

    @Override
    public String getAsText() {
        return getValue().toString();
    }

    @Override
    public void setAsText(final String text) throws IllegalArgumentException {
        setValue(new DateTime(text));
    }

    @Override
    public DateTime getValue() {
        return (DateTime) super.getValue();
    }

    @Override
    public void setValue(final Object value) {
        super.setValue(value == null || value instanceof DateTime ? value : new DateTime(value));
    }

}
