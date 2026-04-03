import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useNavigate } from "react-router-dom";
import { getAdminProducts, saveAdminProducts, generateId, AdminProduct } from "@/lib/adminProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, LogOut, Package, Star, Leaf, LayoutDashboard } from "lucide-react";

const emptyProduct: Omit<AdminProduct, "id" | "ingredients"> & { id?: string } = {
  name: "",
  nameMarathi: "",
  price: 0,
  originalPrice: 0,
  image: "",
  category: "Skin Care",
  description: "",
  descriptionMarathi: "",
  benefits: [],
  benefitsMarathi: [],
  usps: [],
  weight: "",
  inStock: true,
  isBestSeller: false,
  sortOrder: 0,
  rating: 0,
  reviews: 0,
};

const AdminDashboardPage = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { signOut, email } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setProducts(getAdminProducts());
  }, []);

  const persist = (updated: AdminProduct[]) => {
    setProducts(updated);
    saveAdminProducts(updated);
  };

  const handleSave = () => {
    if (!editProduct?.name || !editProduct?.price) {
      toast({ title: "Missing fields", description: "Name and price are required.", variant: "destructive" });
      return;
    }
    setSaving(true);

    setTimeout(() => {
      if (editProduct.id) {
        const updated = products.map((p) => (p.id === editProduct.id ? { ...p, ...editProduct } : p));
        persist(updated);
        toast({ title: "Product updated!" });
      } else {
        const newProduct: AdminProduct = {
          ...editProduct,
          id: generateId(),
          ingredients: [],
        };
        persist([...products, newProduct]);
        toast({ title: "Product created!" });
      }
      setIsDialogOpen(false);
      setEditProduct(null);
      setSaving(false);
    }, 300);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    persist(products.filter((p) => p.id !== id));
    toast({ title: "Product deleted" });
  };

  const toggleBestSeller = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, isBestSeller: !p.isBestSeller } : p
    );
    persist(updated);
  };

  const handleLogout = () => {
    signOut();
    navigate("/admin");
  };

  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Go Arpita Admin</h1>
              <p className="text-xs text-muted-foreground">{email}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{products.length}</p>
                <p className="text-sm text-muted-foreground">Total Products</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{bestSellers.length}</p>
                <p className="text-sm text-muted-foreground">Best Sellers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {products.filter((p) => p.inStock).length}
                </p>
                <p className="text-sm text-muted-foreground">In Stock</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Products</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditProduct({ ...emptyProduct })} size="sm">
                  <Plus className="w-4 h-4 mr-2" /> Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editProduct?.id ? "Edit Product" : "Add New Product"}</DialogTitle>
                </DialogHeader>
                {editProduct && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label>Name *</Label>
                      <Input value={editProduct.name || ""} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Name (Marathi)</Label>
                      <Input value={editProduct.nameMarathi || ""} onChange={(e) => setEditProduct({ ...editProduct, nameMarathi: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={editProduct.category || "Skin Care"} onValueChange={(v) => setEditProduct({ ...editProduct, category: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Skin Care">Skin Care</SelectItem>
                          <SelectItem value="Ayurvedic Treatments">Ayurvedic Treatments</SelectItem>
                          <SelectItem value="Natural Products">Natural Products</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Weight</Label>
                      <Input value={editProduct.weight || ""} onChange={(e) => setEditProduct({ ...editProduct, weight: e.target.value })} placeholder="e.g. 100g" />
                    </div>
                    <div className="space-y-2">
                      <Label>Price (₹) *</Label>
                      <Input type="number" value={editProduct.price || ""} onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Original Price (₹)</Label>
                      <Input type="number" value={editProduct.originalPrice || ""} onChange={(e) => setEditProduct({ ...editProduct, originalPrice: Number(e.target.value) })} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Image URL</Label>
                      <Input value={editProduct.image || ""} onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })} placeholder="https://..." />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Description</Label>
                      <Textarea value={editProduct.description || ""} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} rows={3} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Description (Marathi)</Label>
                      <Textarea value={editProduct.descriptionMarathi || ""} onChange={(e) => setEditProduct({ ...editProduct, descriptionMarathi: e.target.value })} rows={3} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Benefits (comma separated)</Label>
                      <Input
                        value={(editProduct.benefits || []).join(", ")}
                        onChange={(e) => setEditProduct({ ...editProduct, benefits: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) })}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>USPs (comma separated)</Label>
                      <Input
                        value={(editProduct.usps || []).join(", ")}
                        onChange={(e) => setEditProduct({ ...editProduct, usps: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) })}
                      />
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Switch checked={editProduct.inStock ?? true} onCheckedChange={(v) => setEditProduct({ ...editProduct, inStock: v })} />
                        <Label>In Stock</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={editProduct.isBestSeller ?? false} onCheckedChange={(v) => setEditProduct({ ...editProduct, isBestSeller: v })} />
                        <Label>Best Seller</Label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <Button onClick={handleSave} disabled={saving} className="w-full">
                        {saving ? "Saving..." : editProduct.id ? "Update Product" : "Create Product"}
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <p className="text-center py-12 text-muted-foreground">No products yet. Add your first product!</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Best Seller</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {product.image && (
                              <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                            )}
                            <div>
                              <p className="font-medium text-foreground">{product.name}</p>
                              <p className="text-xs text-muted-foreground">{product.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{product.category}</TableCell>
                        <TableCell>
                          <span className="font-semibold text-foreground">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="ml-2 text-xs line-through text-muted-foreground">₹{product.originalPrice}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded-full ${product.inStock ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                            {product.inStock ? "In Stock" : "Out"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={!!product.isBestSeller}
                            onCheckedChange={() => toggleBestSeller(product.id)}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setEditProduct({ ...product });
                                setIsDialogOpen(true);
                              }}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleDelete(product.id)}>
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Best Sellers Section */}
        {bestSellers.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" /> Best Sellers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {bestSellers.map((p) => (
                  <div key={p.id} className="border border-border rounded-xl p-4 bg-card">
                    {p.image && <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded-lg mb-3" />}
                    <h3 className="font-semibold text-foreground">{p.name}</h3>
                    <p className="text-primary font-bold mt-1">₹{p.price}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
