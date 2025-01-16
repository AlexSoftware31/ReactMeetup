import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

export default function DetailPage(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="description"
          content={props.meetupData.description}
        />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://alexander:Y7TOBVxPOBo07a2m@cluster0.7lany.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const meetupsCollections = db.collection("meetups");

  const meetups = await meetupsCollections.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://alexander:Y7TOBVxPOBo07a2m@cluster0.7lany.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const meetupsCollections = db.collection("meetups");

  const selectedMeetup = await meetupsCollections.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
