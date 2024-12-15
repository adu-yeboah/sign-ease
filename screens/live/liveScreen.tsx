import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const { width, height } = Dimensions.get("window")

export default function LiveScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        requestPermission()
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View className='flex-1'>
            <CameraView style={styles.camera} facing={facing}>
                {/* Nanigation */}
                <View className='flex-row justify-between w-full absolute top-10 px-containerPadding'>
                    <TouchableOpacity onPress={toggleCameraFacing}>
                        <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleCameraFacing}>
                        <MaterialCommunityIcons name="camera-flip-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>


                {/* Translation */}
                
                <ScrollView
                    style={styles.buttonContainer} className='bg-white absolute bottom-0 w-full h-2/5 rounded-3xl p-containerPadding'>

                    <TouchableOpacity className='p-padding4 flex-1 w-full'>
                        <MaterialCommunityIcons name="broom" size={34} color="black" className='mb-2' />

                    </TouchableOpacity>
                    <Text className='text-base'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus consequatur facilis ex nostrum suscipit? Vitae nihil doloribus nostrum neque, est incidunt dignissimos accusantium hic consectetur ratione molestias veritatis at natus.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, eos? Dolorum aut nisi, minus dolore numquam adipisci rem recusandae placeat cum molestias deserunt, minima officiis atque maxime expedita nostrum quibusdam!
                        Sed a voluptate ullam est, nulla explicabo accusamus hic? Itaque deleniti veniam rem totam numquam enim facilis doloremque nisi eius excepturi aliquam amet accusantium accusamus temporibus sunt, neque illum ipsum.
                        Reprehenderit, sunt hic in nihil molestias minima sit cupiditate dolores molestiae ducimus debitis, beatae quo. Obcaecati aperiam provident alias nihil. Accusamus dicta quos aperiam in nulla quae perspiciatis, ratione modi.
                        Reiciendis mollitia iste, nam eius omnis expedita autem enim consequuntur, suscipit cumque sapiente? Placeat reprehenderit maxime aliquam voluptates doloremque veniam ipsum, molestias nemo cupiditate perspiciatis quasi doloribus esse modi provident.
                        Voluptatum quae eveniet accusamus aperiam porro molestiae tempora ea reprehenderit ex provident neque sunt recusandae, architecto autem tenetur? Quas ipsam dignissimos eum tenetur dolor voluptates vel animi consequuntur. Qui, asperiores.
                        Dolores quisquam ad, id aliquam exercitationem tenetur natus fuga ipsum voluptas dicta doloremque doloribus vel a, nostrum impedit velit iusto, dignissimos architecto magni neque culpa debitis? Alias ea perspiciatis eos.
                        Ipsam minima corrupti delectus laudantium cupiditate commodi dolores alias amet hic impedit, eligendi assumenda ea inventore voluptates voluptas consectetur dignissimos quibusdam magni esse. Inventore vel quae debitis, illo distinctio eveniet!
                        Quo et at perspiciatis ipsa sapiente rem tempore assumenda totam, minus optio commodi adipisci in repellendus dicta sunt aliquam a odit natus odio deleniti laboriosam, blanditiis quia dolores iusto. Id.
                        Excepturi enim quis quaerat unde dolores, expedita, molestias aspernatur est quibusdam quam illum sit deserunt deleniti. Consectetur aperiam aspernatur quas tempore fugit deserunt ipsum, enim debitis voluptate nulla et iure?
                        Provident, obcaecati velit quo amet ea laboriosam perferendis eaque tempora quae ipsum nostrum necessitatibus explicabo voluptatem, sint aperiam, veritatis facere ut porro expedita non recusandae! Minima libero impedit soluta veritatis.
                        Obcaecati, est provident cumque aspernatur mollitia voluptate debitis exercitationem aperiam odio quam ipsum. Temporibus sit fugit, incidunt vel cumque minima itaque corporis. Omnis voluptatem cum quaerat perferendis accusantium placeat quia.
                        Praesentium architecto deleniti maxime autem obcaecati quas quis omnis saepe, pariatur dolore earum incidunt aut soluta ullam, voluptatibus ipsam, quam dicta aperiam? Laborum obcaecati vitae molestias reiciendis corrupti atque eveniet.
                        Magni perferendis temporibus sed porro obcaecati illum esse facilis sint iste laudantium ea, blanditiis libero fuga quidem perspiciatis recusandae dolor sit explicabo? Molestias reiciendis numquam nulla odit eveniet laborum pariatur!
                        Aliquam tempora earum rerum ducimus minima, perspiciatis repudiandae fugit animi. Quasi fuga ullam labore tenetur aliquid possimus rem quo, sed nisi ad soluta doloribus, accusantium quam, eveniet qui ipsum perferendis.
                        Distinctio, adipisci odit modi tenetur laboriosam ipsum dignissimos aliquam ipsa ad animi esse, id error ut illo recusandae quae veniam minima! Est, fuga officia adipisci cumque et provident facere illo.
                        Voluptate voluptatum architecto corrupti pariatur maiores quam quo nam dolorum, earum optio perspiciatis fugit ea vel non similique doloribus quod? Quos minus tenetur debitis reprehenderit explicabo fugit voluptatibus et veniam.
                        Quam ipsum nisi eum nihil deserunt ea harum! Commodi, quia delectus accusamus sint voluptatum corrupti! Maiores porro perspiciatis hic tenetur quas vitae excepturi et cum minus, sapiente magni. Veritatis, repellendus.
                        Quo illum itaque adipisci aliquid! Aliquam suscipit reprehenderit animi magni est maiores non itaque asperiores natus repellat molestiae eveniet dolorum, debitis id nihil, officia quidem, necessitatibus in minima a quia!
                        Temporibus omnis reiciendis sapiente repellendus? Consequuntur eligendi eum cumque, deserunt maxime, placeat hic aliquid aperiam doloremque reiciendis recusandae fugit blanditiis vitae odio incidunt, repellendus totam error! Reprehenderit quis cupiditate doloribus.
                        Totam dolorem animi cupiditate et illo perspiciatis accusamus rem odit odio natus vero quia similique corporis placeat fugit obcaecati ex quam, quasi, cumque laborum, quis ipsam alias ducimus ea! Obcaecati!
                        Dolorem, maxime numquam delectus cupiditate blanditiis officia, modi tempore explicabo perspiciatis eligendi suscipit consequuntur deserunt soluta! Laboriosam at nemo illo cumque eveniet. Sint maxime et perferendis alias quae quo eum?
                        Sit, magnam dignissimos cum voluptas ratione dolores, recusandae saepe error dolore ducimus voluptatem, quia repellat nisi beatae ea architecto itaque nobis praesentium! Blanditiis eveniet, a laborum illum est inventore laudantium!
                        Laborum vel sint qui modi quos, quaerat dolor asperiores velit consectetur doloribus eveniet, repellendus vitae commodi nesciunt. Rerum eaque incidunt vel unde voluptatem sapiente voluptatibus qui facere rem, reiciendis omnis?
                        Corporis ad aperiam consectetur voluptatum quidem, incidunt eius a facilis autem perferendis numquam fugiat eveniet corrupti obcaecati? Consequatur sunt libero, inventore maiores, porro eveniet aliquid veritatis, natus beatae eos impedit!
                        Praesentium quidem quasi quia laudantium, veritatis magnam maiores adipisci vitae aliquam assumenda est illo in similique cupiditate sit ducimus numquam rerum tenetur porro fuga? Ullam facilis tempore repudiandae perferendis voluptatibus!
                        Praesentium fugit dolores maxime delectus, aliquam est exercitationem quisquam fugiat corrupti, provident minus deleniti maiores corporis tempora, veniam saepe necessitatibus sapiente dignissimos porro reprehenderit quos debitis minima! Enim, unde omnis?
                        Vel enim, dolores earum consequatur voluptates, incidunt tempora saepe sapiente error sint odit dicta natus accusamus eius soluta dolorem nam aliquam quas. Quae reiciendis veniam autem ratione, dolores architecto sapiente?
                        Eius sequi in sapiente amet, odio aspernatur pariatur consequuntur enim totam, perspiciatis explicabo corrupti delectus labore. Ex quae esse tempore eveniet harum. Esse sequi eaque quod pariatur quasi vero laudantium.
                        Laboriosam sapiente dolorem sed dolor a tenetur beatae. Aut minima blanditiis sed, commodi esse optio itaque quia cumque, maxime corrupti dolorum, laudantium provident. Voluptates necessitatibus exercitationem fugit corporis provident inventore!
                        Quod, iusto. Sed blanditiis mollitia quisquam perferendis ex, veritatis commodi, accusamus quia earum laudantium quaerat odit. Natus nulla dolorem amet. Obcaecati cupiditate suscipit facere quia, veniam et itaque numquam error?
                        Mollitia aut minus similique, doloribus tempore id quod nesciunt alias exercitationem recusandae ex expedita cum adipisci necessitatibus sed a nostrum harum? Saepe, enim! At eius cumque ut eveniet quo temporibus.
                        Dignissimos et cum obcaecati temporibus sint delectus impedit illum distinctio eos, aspernatur ea, praesentium dicta reiciendis nulla esse eligendi soluta maxime aliquam voluptate quasi, blanditiis rem perferendis suscipit! Et, aspernatur.
                        Culpa minus, temporibus sit deserunt magnam dignissimos atque nihil officia tempore pariatur ipsum quo quas vero hic dolor minima nesciunt amet consectetur laborum libero a inventore fugiat commodi? Dolorem, corporis.
                        Aperiam, dolorum maxime? Beatae sequi modi a quae laudantium harum iusto veritatis, sunt repudiandae aperiam ipsa atque explicabo minus dolorem commodi? Ex, nesciunt quo eos quas laudantium eaque. Fugiat, ut!
                        Accusamus, voluptatem reiciendis. Qui repudiandae saepe, debitis aut excepturi exercitationem. Inventore, dicta sapiente veritatis voluptatibus totam nisi laudantium dignissimos natus, facere, vitae temporibus. Esse alias doloribus ut modi quas adipisci?
                        Temporibus placeat minima ex animi delectus optio nihil consequatur dolorum! Modi voluptatum possimus fugiat, distinctio, pariatur laudantium earum reiciendis dolor illum architecto esse ipsa. Quidem amet velit hic temporibus eum.
                        Eligendi expedita aliquam blanditiis et, dignissimos at exercitationem rerum voluptas debitis laborum doloremque nulla cupiditate, eaque doloribus neque quod soluta libero sit enim id iure quia ducimus fugiat? Reiciendis, fugiat?
                        Fugit accusantium incidunt alias doloribus obcaecati provident ratione voluptates praesentium ipsam sed illum qui, repudiandae, vero odit nemo et deserunt! Sunt eum velit dolorum, reiciendis tenetur veritatis labore facere voluptatibus!
                        Non, sint dolorum ullam ipsa molestiae consequatur reiciendis sit nostrum provident necessitatibus voluptate cum maxime fuga fugit quidem ab quas dignissimos vitae aliquid dolore ratione. Voluptas repellat labore eligendi harum.
                        Cupiditate obcaecati necessitatibus error eaque ullam dolor pariatur incidunt qui dolorum illo, alias beatae cumque hic cum harum dolorem reiciendis quos ea! Distinctio architecto nihil vitae nulla adipisci, doloribus earum.
                        Ab, incidunt qui sit quo molestiae illum aliquid illo non distinctio, fugiat, facilis dolorem. Temporibus cupiditate consequuntur corporis est deleniti at explicabo nostrum commodi! Aspernatur delectus dignissimos deserunt doloremque enim?
                        Labore accusantium a laborum voluptates reprehenderit illo, numquam deleniti quibusdam doloremque itaque corrupti vitae ex perferendis quasi. Mollitia laborum voluptate fuga magnam dolorum aliquam, laboriosam aspernatur, impedit pariatur in libero?
                        Culpa suscipit unde consequuntur accusantium beatae ducimus minus reiciendis, ullam dolorum fugit voluptatem aliquid debitis hic ipsam reprehenderit, quis earum necessitatibus similique voluptatum! Veniam unde cumque similique obcaecati! Porro, optio?
                        Provident libero, ipsum fugit omnis fugiat distinctio quod? Iusto vero ab saepe, soluta reiciendis nobis hic veritatis nostrum itaque, odio distinctio numquam nam. Perspiciatis, reiciendis a blanditiis laboriosam veniam ratione.
                        Eum eos facere rem ipsum iure at ex saepe quas omnis quam ab, voluptates illum in nihil, soluta molestias minus error. Est atque cumque beatae, nostrum placeat dolorum sapiente veritatis.
                        Eaque consectetur dolorem maxime! Illo cupiditate nemo vero rem. Dolorum numquam provident maxime accusamus aperiam qui a vero ipsum sed ea vitae necessitatibus, ratione repudiandae voluptate optio aliquid atque soluta.
                        Autem repellat unde tempora at porro similique est dolorum saepe vitae quam quaerat quisquam natus fugiat, error in numquam. Dolores accusantium minima possimus quisquam asperiores ab quas ipsa sapiente tempore.
                        Provident quidem corporis commodi facere totam, labore officiis tenetur sunt suscipit optio fugiat alias a dolor eveniet exercitationem esse aspernatur. Voluptates cum repellendus placeat illum, enim ipsam veniam non alias.
                        Cum magni eligendi enim ratione ducimus accusamus, quasi suscipit, nostrum dolorum dignissimos rerum assumenda minus, laudantium cupiditate ullam delectus alias nulla reiciendis aspernatur sunt fugiat eius. Atque vitae alias totam!
                        Rerum beatae dolorem quae nemo soluta exercitationem similique accusamus pariatur molestias adipisci et eligendi ratione commodi, laudantium repudiandae veniam est eos repellendus at, aperiam inventore non. Quae dolorum consequatur expedita.
                        Quas, tempore! Aliquam dicta perferendis eos consectetur inventore deserunt nostrum eum commodi deleniti quis omnis veritatis sint, nihil est sit eveniet quia minima incidunt molestias quas! Ad excepturi alias est!
                        Ea cum aperiam placeat repellat optio, magnam ipsam voluptate nesciunt eum reprehenderit vel odio dolorum molestiae repellendus aspernatur nobis tenetur est neque reiciendis iusto. Magnam earum error accusamus ipsam ipsum.
                        Quibusdam exercitationem facilis inventore magnam eveniet? Ullam corrupti exercitationem, natus beatae dolorum quaerat laborum facere excepturi blanditiis aperiam quo, enim consectetur deleniti eligendi ex unde, nihil sed assumenda dolor aliquam?
                        Repudiandae, maxime. Ad deleniti, assumenda nulla pariatur voluptatibus perferendis minus omnis dolorem! Neque distinctio quam totam sint aliquid tenetur facere libero voluptate? Ipsa obcaecati deleniti et provident unde maiores molestiae?
                        Ex, iure beatae, nulla ipsam, dolorum perspiciatis maiores nostrum doloribus distinctio quod temporibus dolores? Corrupti nesciunt nemo consectetur aspernatur accusamus labore voluptate nam aperiam blanditiis eos, suscipit modi dolor reprehenderit!
                        A maxime, blanditiis aperiam quia dignissimos iusto ipsum hic vel suscipit reprehenderit asperiores quas illum cupiditate quisquam, dolorum in adipisci magnam harum nihil praesentium ea. Hic quasi in incidunt sunt.
                        Laboriosam doloribus velit maiores commodi possimus, vero sit fugit quibusdam fuga molestiae consectetur, harum enim nostrum, quod architecto quo exercitationem culpa illum sapiente at nihil doloremque assumenda adipisci. Earum, accusantium.
                        Dolor, sint inventore modi fugit voluptatum quae, quaerat vero quo perspiciatis iure ab dolore laborum, beatae ducimus laudantium hic sunt porro esse temporibus incidunt et est sapiente! Distinctio, dolor explicabo.
                        Cumque ab exercitationem ipsam voluptatem ut, aperiam neque dignissimos alias pariatur tenetur reprehenderit iusto nostrum voluptas reiciendis consequuntur quo corporis delectus, totam magnam ea quidem provident doloribus temporibus eius. Incidunt!
                        Neque et quam doloribus omnis in saepe adipisci culpa sit accusantium quibusdam, accusamus quod qui repellendus aut nisi assumenda ad incidunt error a ullam tempora nihil, consectetur quos! Assumenda, atque.
                        Vero qui, velit officiis consequatur ea provident illo alias saepe voluptatibus doloremque possimus aspernatur, cumque ad. Cum facilis tempore iure modi. Impedit corporis repellendus dolores sint quaerat sed. Dolores, cupiditate.
                        Atque, tempora eveniet. Minus dignissimos, adipisci debitis eveniet reiciendis nulla officia molestiae possimus deserunt suscipit, pariatur quis ipsum odio reprehenderit vel impedit nesciunt aperiam perspiciatis fugit asperiores, facilis cumque quibusdam.
                        Ea animi nulla fugiat fugit placeat, a odio aspernatur fuga reprehenderit sint quidem blanditiis minima eveniet, quisquam culpa ipsum numquam magni dicta quia qui consectetur! Voluptatum, dolorem deleniti! Quisquam, sapiente.
                        Iure voluptatibus unde dignissimos est delectus ullam alias modi eveniet quidem corrupti quasi enim, illum facere suscipit distinctio earum. Amet sit sequi ex voluptate ut eaque quas ipsum quis esse.
                        Facilis cupiditate eveniet dolore aliquid eius ipsam placeat sed obcaecati voluptates ipsum, harum rerum minus cum voluptas quis eligendi omnis, ullam iusto, debitis exercitationem dolor quibusdam. Vitae quos odit aut?
                        Eveniet officia ea nemo architecto iure quis, omnis tenetur harum incidunt vel molestiae ipsam id excepturi sint, modi dicta minus totam cupiditate aspernatur dolorem placeat. Corrupti fugiat nam earum commodi.
                        Id ut, eaque quaerat velit accusamus assumenda suscipit eveniet consectetur in delectus provident rerum quos neque quia eligendi reprehenderit blanditiis accusantium tenetur nesciunt tempore consequatur laboriosam, temporibus perspiciatis voluptas. Itaque?
                    </Text>

                </ScrollView>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    buttonContainer: {
        // flexDirection: 'row',

    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },

});
