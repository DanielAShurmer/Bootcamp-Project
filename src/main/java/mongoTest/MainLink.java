package mongoTest;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Collation;
import com.mongodb.client.model.Indexes;
import com.mongodb.MongoCredential;
import com.mongodb.MongoClientOptions;
import java.util.Arrays;

import org.bson.Document;

public class MainLink {

	public static void main(String[] args) {
		MongoClient mongoClient = new MongoClient("127.0.0.1" , 27017);
		MongoDatabase database = mongoClient.getDatabase("Test");
		MongoCollection<Document> coll = database.getCollection("myTestCollection");
		coll.createIndex(Indexes.text("name"));
	}

}
