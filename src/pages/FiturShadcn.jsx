import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Container from "../components/layout/Container";

// Import komponen Shadcn UI
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Icon untuk tambahan aesthetic (FaSparkle sudah dihapus karena tidak tersedia)
import { 
  FaGem, 
  FaStar,        // Ganti dari FaSparkle ke FaStar
  FaShoppingBag, 
  FaTruck, 
  FaShieldAlt, 
  FaWhatsapp, 
  FaInstagram,
  FaRegHeart
} from "react-icons/fa";

export default function FiturShadcn() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Container>
      <PageHeader title="UI Library Demo" breadcrumb="Shadcn UI" />

      {/* Hero kecil untuk perkenalan */}
      <div className="bg-gradient-to-r from-pink/10 to-purple-100 rounded-2xl p-6 mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-4 py-1 mb-3">
          <FaStar className="text-pink" />  {/* Perbaikan: FaSparkle → FaStar */}
          <span className="text-sm font-medium text-pink">Powered by Shadcn UI</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Komponen UI Modern untuk <span className="text-pink">Na_store</span>
        </h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Koleksi komponen berbasis Tailwind CSS yang bisa dikustomisasi sesuai kebutuhan toko aksesoris kamu.
        </p>
      </div>

      {/* 1. Komponen Alert */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="bg-pink/10 text-pink hover:bg-pink/20">Komponen 1</Badge>
          <h2 className="text-xl font-bold text-gray-800">Alert / Notifikasi</h2>
        </div>
        <div className="grid gap-4">
          <Alert className="border-l-4 border-l-pink">
            <FaGem className="h-4 w-4 text-pink" />
            <AlertTitle className="text-pink font-semibold">Selamat Datang di Na_store! 💎</AlertTitle>
            <AlertDescription>
              Kamu bisa menambahkan komponen Alert dari Shadcn UI ke project Na_store. Cocok untuk notifikasi promo, diskon, atau info penting lainnya.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive" className="border-l-4 border-l-red-500">
            <FaShoppingBag className="h-4 w-4" />
            <AlertTitle>Oops! Stok Habis</AlertTitle>
            <AlertDescription>
              Produk yang kamu cari sedang habis. Tapi tenang, masih banyak koleksi menarik lainnya di Na_store!
            </AlertDescription>
          </Alert>
          <Alert className="bg-green-50 border-l-4 border-l-green-500 text-green-800">
            <FaTruck className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-700">Gratis Ongkir! 🚚</AlertTitle>
            <AlertDescription>
              Belanja minimal Rp 100.000, gratis ongkir se-Jabodetabek. Kode: NASTORE10
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* 2. Komponen Dialog (Modal) */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="bg-pink/10 text-pink hover:bg-pink/20">Komponen 2</Badge>
          <h2 className="text-xl font-bold text-gray-800">Dialog / Modal Popup</h2>
        </div>
        <Card className="bg-gradient-to-r from-gray-50 to-white">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-pink/10 rounded-full flex items-center justify-center">
                <FaRegHeart className="text-pink text-2xl" />
              </div>
              <div>
                <p className="text-gray-600 mb-3">Klik tombol di bawah untuk melihat contoh modal interaktif</p>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-pink hover:bg-pink/80 text-white px-6">
                      <FaGem className="mr-2" /> Buka Modal Koleksi Spesial
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <FaStar className="text-yellow-400" /> Koleksi Terbaru Na_store
                      </DialogTitle>
                      <DialogDescription>
                        Dapatkan akses eksklusif ke koleksi aksesoris terbaru sebelum rilis ke publik!
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="bg-pink/5 rounded-xl p-4 text-center">
                        <p className="text-pink font-semibold">✨ Early Access ✨</p>
                        <p className="text-sm text-gray-600 mt-1">Diskon 15% untuk member yang mendaftar sekarang</p>
                      </div>
                      <div className="flex justify-center gap-3 text-sm text-gray-500">
                        <span>📦 Gratis Ongkir</span>
                        <span>🛡️ Garansi 14 Hari</span>
                        <span>🔄 Bisa Return</span>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setDialogOpen(false)}>
                        Nanti Saja
                      </Button>
                      <Button className="bg-pink hover:bg-pink/80" onClick={() => setDialogOpen(false)}>
                        Dapatkan Diskon
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Komponen Tabs */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="bg-pink/10 text-pink hover:bg-pink/20">Komponen 3</Badge>
          <h2 className="text-xl font-bold text-gray-800">Tabs / Menu Tab</h2>
        </div>
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="tentang" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                <TabsTrigger value="tentang" className="data-[state=active]:bg-pink data-[state=active]:text-white">
                  ✨ Tentang Na_store
                </TabsTrigger>
                <TabsTrigger value="layanan" className="data-[state=active]:bg-pink data-[state=active]:text-white">
                  🛍️ Layanan
                </TabsTrigger>
                <TabsTrigger value="kontak" className="data-[state=active]:bg-pink data-[state=active]:text-white">
                  📞 Kontak Kami
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tentang" className="p-4 bg-pink/5 rounded-lg mt-3">
                <div className="flex items-start gap-3">
                  <FaGem className="text-pink text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Na_store Aksesoris Fashion</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Na_store adalah toko aksesoris fashion yang menyediakan berbagai produk berkualitas seperti 
                      kalung, gelang, anting, dan cincin dengan desain elegan dan modern.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge className="bg-pink/10 text-pink">Kalung</Badge>
                      <Badge className="bg-pink/10 text-pink">Gelang</Badge>
                      <Badge className="bg-pink/10 text-pink">Anting</Badge>
                      <Badge className="bg-pink/10 text-pink">Cincin</Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="layanan" className="p-4 bg-pink/5 rounded-lg mt-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl p-3 text-center">
                    <FaTruck className="text-pink text-xl mx-auto mb-1" />
                    <p className="font-semibold text-sm">Gratis Ongkir</p>
                    <p className="text-xs text-gray-500">Min. belanja Rp100.000</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center">
                    <FaShieldAlt className="text-pink text-xl mx-auto mb-1" />
                    <p className="font-semibold text-sm">Garansi 14 Hari</p>
                    <p className="text-xs text-gray-500">Untuk produk cacat</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center">
                    <FaGem className="text-pink text-xl mx-auto mb-1" />
                    <p className="font-semibold text-sm">Produk Original</p>
                    <p className="text-xs text-gray-500">100% berkualitas</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center">
                    <FaShoppingBag className="text-pink text-xl mx-auto mb-1" />
                    <p className="font-semibold text-sm">Pengembalian Mudah</p>
                    <p className="text-xs text-gray-500">Dalam 7 hari</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="kontak" className="p-4 bg-pink/5 rounded-lg mt-3">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                    <FaWhatsapp className="text-green-500 text-xl" />
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <p className="text-sm text-gray-600">0812-3456-7890</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                    <FaInstagram className="text-pink text-xl" />
                    <div>
                      <p className="font-semibold">Instagram</p>
                      <p className="text-sm text-gray-600">@na_store.id</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                    <FaGem className="text-pink text-xl" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-sm text-gray-600">hello@nastore.id</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* 4. Demo Lengkap Card + Badge + Button */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="bg-pink/10 text-pink hover:bg-pink/20">Bonus Demo</Badge>
          <h2 className="text-xl font-bold text-gray-800">Card Premium Na_store</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1 - Produk Unggulan */}
          <Card className="border-2 border-pink/20 hover:shadow-lg transition">
            <CardHeader className="bg-gradient-to-r from-pink/5 to-transparent">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FaGem className="text-pink" /> Koleksi Kalung Mutiara
                </CardTitle>
                <Badge className="bg-pink text-white">Best Seller 🔥</Badge>
              </div>
              <CardDescription>
                Kalung mutiara elegan untuk acara spesial
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-pink">Rp 125.000</p>
                  <p className="text-xs text-gray-400 line-through">Rp 150.000</p>
                </div>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-gray-300" />
                  <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                ⚡ Stok tersisa 15 pcs. Pesan sebelum kehabisan!
              </p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="bg-pink hover:bg-pink/80 flex-1">Beli Sekarang</Button>
              <Button variant="outline">Detail</Button>
            </CardFooter>
          </Card>

          {/* Card 2 - Membership */}
          <Card className="border-2 border-purple-200 hover:shadow-lg transition">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FaStar className="text-purple-500" /> Na_store Pro  {/* Perbaikan: FaSparkle → FaStar */}
                </CardTitle>
                <Badge variant="secondary" className="bg-purple-100 text-purple-600">Premium</Badge>
              </div>
              <CardDescription>
                Nikmati fitur eksklusif untuk member setia Na_store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">✅ Akses koleksi eksklusif</li>
                <li className="flex items-center gap-2">✅ Diskon member 10% setiap pembelian</li>
                <li className="flex items-center gap-2">✅ Gratis ongkir tanpa minimal belanja</li>
                <li className="flex items-center gap-2">✅ Undangan event khusus member</li>
              </ul>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="bg-gradient-to-r from-pink to-purple-500 flex-1">Langganan Sekarang</Button>
              <Button variant="outline">Pelajari Lebih</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center p-6 bg-gray-50 rounded-2xl mt-6">
        <p className="text-gray-500 text-sm">
          🎉 Komponen ini menggunakan <strong className="text-pink">Shadcn UI</strong> + Tailwind CSS. 
          Bisa langsung dipakai dan dikustomisasi untuk kebutuhan Na_store!
        </p>
      </div>
    </Container>
  );
}