package ru.greatbit.quack.storage;

import ru.greatbit.quack.beans.Attachment;
import ru.greatbit.whoru.auth.Session;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

public class StubStorage implements Storage {
    @Override
    public Attachment upload(InputStream uploadedInputStream, String fileName, Session session, long size) throws IOException {
        return new Attachment().withId(UUID.randomUUID().toString()).withTitle(fileName);
    }

    @Override
    public void remove(Attachment attachment) throws IOException {

    }

    @Override
    public InputStream get(Attachment attachment) throws IOException {
        return ClassLoader.getSystemResourceAsStream("/stubfile.txt");
    }
}
